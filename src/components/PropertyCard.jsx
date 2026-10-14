import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

/**
 * Shared listing card used by Developments and LatestProjects.
 * Purely presentational — callers keep their own data-fetching/URL logic
 * and just pass the resolved image/title/price/location/href.
 *
 * Editorial "image + caption" treatment: no box, a fine rule under the
 * image, and full-colour photography (listing photos carry information,
 * so they are never desaturated).
 */
export default function PropertyCard({ image, title, price, location, tag, href }) {
  return (
    <Link to={href} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-stone aspect-[4/5]">
        {tag && (
          <span className="absolute top-4 left-4 z-10 bg-paper text-ink text-[10px] font-medium uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
            {tag}
          </span>
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500 ease-editorial">
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </span>
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-medium text-[22px] leading-tight text-ink line-clamp-2">
            {title}
          </h3>
          {price && (
            <p className="shrink-0 pt-1 text-sm font-medium text-ink tabular-nums">{price}</p>
          )}
        </div>

        {location && (
          <p className="flex items-center text-muted text-sm mt-2">
            <MapPin size={14} strokeWidth={1.5} className="mr-1.5 shrink-0" />
            <span className="truncate">{location}</span>
          </p>
        )}

        <span className="mt-5 pt-4 border-t border-line flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.16em] text-ink">
          View more detail
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
