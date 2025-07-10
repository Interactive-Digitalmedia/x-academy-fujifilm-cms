import { Blog } from "@/types";

interface AuthorInfoCardProps {
  blog: Blog;
}

const AuthorDisplay: React.FC<AuthorInfoCardProps> = ({ blog }) => {
  const { authorModel, author, customAuthor } = blog;

  const isOther = authorModel === "Other";

  const name = isOther
    ? customAuthor?.name
    : typeof author === "object"
      ? author?.fullname || author?.userName || "Unknown"
      : typeof author === "string"
        ? author
        : "Unknown";

  const profileImage = isOther
    ? customAuthor?.image
    : typeof author === "object"
      ? author?.profileImage
      : undefined;

  const initial = name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <div className="flex flex-col text-sm text-gray-800">
        <span className="text-base capitalize">{name}</span>
        {/* About */}
        {/* {isOther && customAuthor?.about && (
          <p className="text-gray-600 mt-1 text-sm">{customAuthor.about}</p>
        )} */}

        {/* Social links */}
        {/* {isOther && customAuthor?.socialMediaUrls && (
          <div className="flex gap-3 mt-2 text-blue-600">
            {customAuthor.socialMediaUrls.facebook && (
              <a
                href={customAuthor.socialMediaUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            )}
            {customAuthor.socialMediaUrls.instagram && (
              <a
                href={customAuthor.socialMediaUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AuthorDisplay;
