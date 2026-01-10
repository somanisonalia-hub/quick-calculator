#!/usr/bin/env python3
"""
Calculator Content Generation Pipeline

Complete automation pipeline that:
1. Crawls sitemaps to discover calculators
2. Extracts and generates content
3. Translates to multiple languages
4. Updates the content registry

Usage:
    python run_pipeline.py --sitemap https://www.calculatorsoup.com/sitemap.xml --languages es,fr,de
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path


class ContentPipeline:
    """Orchestrates the complete content generation pipeline."""

    def __init__(self, project_root: str = None):
        """Initialize pipeline.

        Args:
            project_root: Root directory of the project (auto-detected if None)
        """
        if project_root is None:
            # Auto-detect project root
            current_dir = Path(__file__).parent
            self.project_root = current_dir.parent
        else:
            self.project_root = Path(project_root)

        self.automation_dir = self.project_root / "automation"
        self.content_dir = self.project_root / "content"

        # Ensure directories exist
        self.content_dir.mkdir(exist_ok=True)
        (self.content_dir / "en" / "calculators").mkdir(parents=True, exist_ok=True)

    def run_content_generation(self, sitemap_url: str, limit: int = None, use_ai: bool = False):
        """Run content generation phase."""
        print("🚀 Phase 1: Content Generation")
        print("=" * 50)

        cmd = [
            sys.executable,
            str(self.automation_dir / "content_generator.py"),
            "--sitemap", sitemap_url,
            "--output", str(self.content_dir / "en" / "calculators")
        ]

        if limit:
            cmd.extend(["--limit", str(limit)])

        if use_ai and os.getenv('OPENAI_API_KEY'):
            cmd.extend(["--openai-key", os.getenv('OPENAI_API_KEY')])

        result = subprocess.run(cmd, cwd=self.automation_dir)
        if result.returncode != 0:
            raise RuntimeError("Content generation failed")

    def run_translation(self, languages: list, service: str = 'google'):
        """Run translation phase."""
        print("
🌍 Phase 2: Content Translation"        print("=" * 50)

        if not languages:
            print("⚠️  No languages specified, skipping translation")
            return

        cmd = [
            sys.executable,
            str(self.automation_dir / "translate_content.py"),
            "--input", str(self.content_dir / "en" / "calculators"),
            "--output", str(self.content_dir),
            "--languages", ",".join(languages),
            "--service", service
        ]

        # Add DeepL key if using DeepL
        if service == 'deepl' and os.getenv('DEEPL_API_KEY'):
            cmd.extend(["--deepl-key", os.getenv('DEEPL_API_KEY')])

        result = subprocess.run(cmd, cwd=self.automation_dir)
        if result.returncode != 0:
            raise RuntimeError("Translation failed")

    def update_content_registry(self):
        """Update the content registry with new calculators."""
        print("
📝 Phase 3: Update Content Registry"        print("=" * 50)

        # Import the registry update function
        try:
            sys.path.insert(0, str(self.project_root / "src" / "lib"))
            from contentRegistry import getAvailableCalculators

            # Get current calculators
            en_calculators = getAvailableCalculators('en')
            print(f"📊 Content registry updated with {len(en_calculators)} calculators")

        except ImportError:
            print("⚠️  Could not update content registry automatically")
            print("   Run 'npm run build' to update the registry manually")

    def run_full_pipeline(self, sitemap_url: str, languages: list = None,
                         limit: int = None, use_ai: bool = False, service: str = 'google'):
        """Run the complete pipeline."""
        print("🎯 Calculator Content Generation Pipeline")
        print("=" * 60)
        print(f"📍 Sitemap: {sitemap_url}")
        print(f"🌍 Languages: {', '.join(languages) if languages else 'None'}")
        print(f"🤖 AI Generation: {'Enabled' if use_ai else 'Disabled'}")
        print(f"🔄 Translation Service: {service}")
        if limit:
            print(f"📊 Limit: {limit} calculators")
        print()

        try:
            # Phase 1: Generate English content
            self.run_content_generation(sitemap_url, limit, use_ai)

            # Phase 2: Translate to other languages
            if languages:
                self.run_translation(languages, service)

            # Phase 3: Update registry
            self.update_content_registry()

            print("
✅ Pipeline completed successfully!"            print(f"📁 Content saved to: {self.content_dir}")
            print("🔄 Next steps:")
            print("   1. Review generated content for quality")
            print("   2. Run 'npm run build' to update the application")
            print("   3. Test the new calculators in your app")

        except Exception as e:
            print(f"\n❌ Pipeline failed: {e}")
            sys.exit(1)

    def validate_environment(self):
        """Validate that required dependencies are installed."""
        print("🔍 Validating environment...")

        required_modules = ['requests', 'bs4']
        missing_modules = []

        for module in required_modules:
            try:
                __import__(module)
            except ImportError:
                missing_modules.append(module)

        if missing_modules:
            print(f"❌ Missing required modules: {', '.join(missing_modules)}")
            print("   Run: pip install -r automation/requirements.txt")
            return False

        # Check optional AI dependencies
        try:
            import openai
            print("✅ OpenAI library available for AI content generation")
        except ImportError:
            print("⚠️  OpenAI library not available (optional for AI generation)")

        try:
            import deepl
            print("✅ DeepL library available for premium translations")
        except ImportError:
            print("⚠️  DeepL library not available (optional for premium translations)")

        print("✅ Environment validation complete")
        return True


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Complete calculator content generation pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate content from CalculatorSoup with AI
  python run_pipeline.py --sitemap https://www.calculatorsoup.com/sitemap.xml --ai --languages es,fr

  # Generate basic content (no AI) for testing
  python run_pipeline.py --sitemap https://example.com/sitemap.xml --limit 5

  # Use DeepL for high-quality translations
  export DEEPL_API_KEY=your_key_here
  python run_pipeline.py --sitemap https://example.com/sitemap.xml --service deepl --languages de,fr
        """
    )

    parser.add_argument('--sitemap', required=True, help='Sitemap URL to crawl for calculators')
    parser.add_argument('--languages', help='Comma-separated target languages (e.g., es,fr,de)')
    parser.add_argument('--limit', type=int, help='Limit number of calculators to process (for testing)')
    parser.add_argument('--ai', action='store_true', help='Use OpenAI for enhanced content generation')
    parser.add_argument('--service', choices=['google', 'deepl'], default='google',
                       help='Translation service to use')

    args = parser.parse_args()

    # Validate environment
    pipeline = ContentPipeline()
    if not pipeline.validate_environment():
        sys.exit(1)

    # Validate AI requirements
    if args.ai and not os.getenv('OPENAI_API_KEY'):
        print("❌ OPENAI_API_KEY environment variable required for AI generation")
        print("   Get your API key from: https://platform.openai.com/api-keys")
        sys.exit(1)

    # Validate DeepL requirements
    if args.service == 'deepl' and not os.getenv('DEEPL_API_KEY'):
        print("❌ DEEPL_API_KEY environment variable required for DeepL translation")
        print("   Get your API key from: https://www.deepl.com/pro-api")
        sys.exit(1)

    # Parse languages
    languages = None
    if args.languages:
        languages = [lang.strip() for lang in args.languages.split(',')]

    # Run pipeline
    pipeline.run_full_pipeline(
        sitemap_url=args.sitemap,
        languages=languages,
        limit=args.limit,
        use_ai=args.ai,
        service=args.service
    )


if __name__ == '__main__':
    main()
