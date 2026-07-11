/**
 * Shared Venn diagram logo icon used across the app.
 * Uses clip-paths to render proper overlapping blend regions.
 */
export default function VennIcon({ size = 32 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="vi-clip-top">
                    <circle cx="100" cy="68" r="56" />
                </clipPath>
                <clipPath id="vi-clip-bl">
                    <circle cx="70" cy="120" r="56" />
                </clipPath>
                <clipPath id="vi-clip-br">
                    <circle cx="130" cy="120" r="56" />
                </clipPath>
                <clipPath id="vi-clip-top-bl">
                    <circle cx="100" cy="68" r="56" />
                </clipPath>
                <clipPath id="vi-clip-top-br">
                    <circle cx="100" cy="68" r="56" />
                </clipPath>
                <clipPath id="vi-clip-bl-br">
                    <circle cx="70" cy="120" r="56" />
                </clipPath>
                <clipPath id="vi-clip-tri-a">
                    <circle cx="100" cy="68" r="56" />
                </clipPath>
                <clipPath id="vi-clip-tri-b">
                    <circle cx="70" cy="120" r="56" />
                </clipPath>
            </defs>

            {/* Base circles */}
            <circle cx="100" cy="68" r="56" fill="#FF6B5B" />
            <circle cx="70" cy="120" r="56" fill="#6B3FA0" />
            <circle cx="130" cy="120" r="56" fill="#FFD23F" />

            {/* Coral + Plum overlap (berry) — clip top circle, draw bl circle */}
            <circle cx="70" cy="120" r="56" fill="#C44B7D" clipPath="url(#vi-clip-top-bl)" />

            {/* Coral + Butter overlap (tangerine) — clip top circle, draw br circle */}
            <circle cx="130" cy="120" r="56" fill="#FF9D3A" clipPath="url(#vi-clip-top-br)" />

            {/* Plum + Butter overlap (olive) — clip bl circle, draw br circle */}
            <circle cx="130" cy="120" r="56" fill="#7BA05B" clipPath="url(#vi-clip-bl-br)" />

            {/* Triple overlap (terracotta) — clip to top+bl, draw br circle */}
            <g clipPath="url(#vi-clip-tri-a)">
                <circle cx="130" cy="120" r="56" fill="#B96A4A" clipPath="url(#vi-clip-tri-b)" />
            </g>

            {/* "10" text in triple overlap center */}
            <text
                x="100"
                y="110"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="38"
                fontWeight="700"
                fill="white"
            >10</text>
        </svg>
    );
}
