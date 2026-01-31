import { redirect } from 'next/navigation';

export default function _401kCalculatorRedirect() {
  redirect('/en/401k-calculator');
}
