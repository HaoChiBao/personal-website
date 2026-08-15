"use client";

import { useState } from "react";

type Props = {
  username: string;
  href: string;
};

/**
 * Contribution calendar via ghchart (SVG). Color matches site ink.
 * Hidden if the remote chart fails so a blank broken image is not left behind.
 * @see https://ghchart.rshah.org
 */
export default function GithubContributions({ username, href }: Props) {
  const [failed, setFailed] = useState(false);
  const src = `https://ghchart.rshah.org/111111/${username}`;

  return (
    <section className="section section--contrib" id="github">
      <h2>GitHub</h2>
      <a
        className="contrib"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${username} on GitHub`}
      >
        {failed ? (
          <span className="contrib__fallback">{username}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="contrib__graph"
            src={src}
            alt={`${username}'s GitHub contribution graph`}
            width={663}
            height={104}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </a>
    </section>
  );
}
