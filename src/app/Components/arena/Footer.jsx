import Link from 'next/link';

// Every route that actually exists in src/app, listed plainly. Games included —
// they are part of the site even though they refuse the theme.
const INDEX = [
  { href: '/projects', label: 'projects' },
  { href: '/bloglist', label: 'writing' },
  { href: '/me', label: 'about' },
  { href: '/workingon', label: 'working on' },
  { href: '/sneakpeak', label: 'sneak peek' },
  { href: '/wallpapers', label: 'wallpapers' },
  { href: '/linktree', label: 'links' },
  { href: '/faq', label: 'faq' },
  { href: '/pacman', label: 'pacman' },
  { href: '/tic-tak-toe', label: 'tic tac toe' },
];

export default function ArenaFooter({ note, credit }) {
  return (
    <>
      <section className="a-section">
        <p className="a-label">INDEX</p>
        <ul className="a-index">
          {INDEX.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </section>
      {note && <p className="a-foot">{note}</p>}
      {credit && <p className="a-credit">{credit}</p>}
    </>
  );
}
