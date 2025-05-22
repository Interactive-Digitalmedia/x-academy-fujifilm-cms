type Props = {
  label: string
}

const TagChip = ({ label }: Props) => {
  return (
    <span className='rounded-full bg-gradient-to-r from-emerald-600 to-emerald-900 px-4 py-1 text-sm font-normal text-white'>
      {label}
    </span>
  )
}

export default TagChip
