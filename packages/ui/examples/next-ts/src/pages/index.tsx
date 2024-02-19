import { routesData } from '../../../shared';
import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <h2>Zag.js + React</h2>
      <ul>
        {routesData.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
