import Link from 'next/link';

// The same masthead on every page: archives ranged left, contact ranged right,
// the two of them framing whatever the page is.
export default function ArenaHeader({
  github = 'https://github.com/CodeWithInferno',
  linkedin = 'https://linkedin.com/in/prathampatel2618/',
  current,
}) {
  const links = [
    { href: '/', label: 'HOME' },
    { href: '/bloglist', label: 'WRITING ARCHIVE' },
    { href: '/projects', label: 'PROJECT ARCHIVE' },
  ];

  return (
    <header className="a-head">
      <div className="a-head-left">
        {links
          .filter((l) => l.href !== current)
          .map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        <a href="https://codewithinferno.github.io/" rel="noopener" target="_blank">
          PUBLICATIONS
        </a>
      </div>
      <div className="a-head-right">
        <span className="a-name">Pratham Patel</span>
        <a href="mailto:prathambiren2618@gmail.com">prathambiren2618@gmail.com</a>
        <a href={github} rel="me noopener" target="_blank">
          @CodeWithInferno
        </a>
        <a href={linkedin} rel="me noopener" target="_blank">
          linkedin
        </a>
      </div>
    </header>
  );
}
