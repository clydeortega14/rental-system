import StartIcon from "@/Components/LandingPage/StartIcon";
import { useState } from "react";

interface IRating {
    rating: number;
}

function StarRating({ rating }: Irating) {
    const [hoveredRating, setHoveredRating] = useState(null);

    // Generate an array of 5 elements representing each star
    const stars = Array.from({ length: 5 }, (_, index) => {
        // Determine if the star should be filled, half-filled, or empty based on the rating
        let filled = false;
        if (index + 1 <= rating) {
            filled = true;
        } else if (index < rating && rating % 1 !== 0) {
            filled = null; // For half-filled star
        }
        return (
            <span
                key={index}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(null)}
            >
                <StartIcon
                    filled={
                        filled === true ||
                        (filled === null &&
                            hoveredRating !== null &&
                            index < hoveredRating)
                    }
                />
            </span>
        );
    });

    return <div className="flex">{stars}</div>;
}

export default StarRating;
