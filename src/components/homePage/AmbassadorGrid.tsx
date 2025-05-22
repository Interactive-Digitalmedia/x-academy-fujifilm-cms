type Ambassador = {
  name: string
  camera: string
  image: string
  bgColor: string
}
type Props = {
  ambassadors: Ambassador[]
}
const AmbassadorGrid: React.FC<Props> = ({ ambassadors }) => {
  return (
    <div className='grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 lg:grid-cols-3'>
      {ambassadors.slice(0, 3).map((amb, i) => (
        <div
          key={i}
          className='flex h-[260px] w-full overflow-hidden rounded-2xl'
        >
          {/* Left Side: Image */}
          <div className='h-full w-full'>
            <img
              src={amb.image}
              alt={amb.name}
              className='h-full w-full object-cover'
            />
          </div>
          {/* Right Side: Text */}
          {/* <div
            className={`w-1/2 h-full p-6 text-white flex flex-col justify-center ${amb.bgColor}`}
          >
            <p className="uppercase text-sm tracking-wider mb-2">{amb.camera}</p>
            <h3 className="text-2xl font-bold leading-tight">
              {amb.name.split(" ")[0]}<br />{amb.name.split(" ")[1]}
            </h3>
          </div> */}
        </div>
      ))}
    </div>
  )
}
export default AmbassadorGrid
