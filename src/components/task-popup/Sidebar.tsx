// import React from 'react';
// import IconButton from './IconButton';
// import TagChip from './TagChip';

// const icons = [
//   { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d924822908e0ad66f2b05c056a436b657930d92e264093c3b139d4a15264c35f?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3", alt: "Icon 1" },
//   { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6fb3c339f4dc87924da41423200bd39c71367a3b11aa4df249cee9a65c4d0cba?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3", alt: "Icon 2" },
//   { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/745d5285215b730fa0fec4f58da150a48875ea8718ac74116caddc676b9d2171?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3", alt: "Icon 3" }
// ];

// const tags = [
//   { label: "+", isAdd: true },
//   { label: "Note", isAdd: false },
//   { label: "Learning", isAdd: false }
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <aside className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col items-start pt-8 pr-16 pb-96 pl-6 mx-auto w-full rounded-none bg-zinc-300 max-md:px-5 max-md:pb-24 max-md:mt-10">
//         <div className="flex gap-5 items-center px-4 py-2 border border-gray-300 border-solid bg-white bg-opacity-20 min-h-[48px] rounded-[85px]">
//           {icons.map((icon, index) => (
//             <IconButton key={index} src={icon.src} alt={icon.alt} />
//           ))}
//         </div>
//         <h2 className="mt-11 text-xl font-light text-black max-md:mt-10">Tags</h2>
//         <div className="flex gap-3 mt-3 max-w-full text-xs font-medium text-center whitespace-nowrap text-neutral-400 w-[195px]">
//           {tags.map((tag, index) => (
//             <TagChip key={index} label={tag.label} isAdd={tag.isAdd} />
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
