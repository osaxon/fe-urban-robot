/* eslint-disable react/prop-types */
export const Avatar = ({ src, alt = "user avatar" }) => {
    return (
        <div className="w-12 h-12 flex-shrink-0 rounded-full border overflow-hidden">
            <img
                className="w-full h-full object-contain object-center"
                src={src}
                alt={alt}
            />
        </div>
    );
};
