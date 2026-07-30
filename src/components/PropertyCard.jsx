import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

/**
 * Shared listing card used by Developments and LatestProjects.
 * Purely presentational — callers keep their own data-fetching/URL logic
 * and just pass the resolved image/title/price/location/href.
 */
export default function PropertyCard({ image, title, price, location, tag, href }) {
  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-none ring-1 ring-brand-ink/[0.06] hover:shadow-xl hover:ring-brand-ink/0 transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/5]">
        {tag && (
          <span className="absolute top-3 left-3 z-10 bg-brand-paper/90 text-brand-maroon text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
            {tag}
          </span>
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-brand-ink leading-snug truncate">
          {title}
        </h3>

        {price && (
          <p className="text-brand-maroon text-sm font-semibold mt-2">{price}</p>
        )}

        {location && (
          <p className="flex items-center text-gray-500 text-xs sm:text-sm mt-2">
            <MapPin size={14} className="mr-1 shrink-0" />
            <span className="truncate">{location}</span>
          </p>
        )}

        <Link
          to={href}
          className="mt-4 pt-3 border-t border-brand-ink/10 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-gold hover:text-brand-maroon transition-colors duration-300"
        >
          View more detail
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
