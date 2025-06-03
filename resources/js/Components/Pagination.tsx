import '@/types';

interface PaginationProps {
  links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {links.map((link, index) => (
          <li
            key={index}
            className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
          >
            <a
              className="page-link"
              href={link.url || '#'}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}