// const cardsData = [
//   { id: 1, imageSrc: '/images/founder.png', title: 'Founder / Co-Founder' },
//   { id: 2, imageSrc: '/images/contentCreator.png', title: 'Content Creator' },
//   { id: 3, imageSrc: '/images/student.png', title: 'Student' },
//   {
//     id: 4,
//     imageSrc: '/images/workingprofessional.png',
//     title: 'Working Professional'
//   },
//   { id: 5, imageSrc: '/images/freelancer.png', title: 'Freelancer' },
//   {
//     id: 6,
//     imageSrc: '/images/licensedProfessional.png',
//     title: 'Licensed Professional'
//   }
// ]
import React from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/react'
import {
  CodeXml,
  Briefcase,
  Linkedin,
  UserRound,
  Video,
  Scale,
  BookText,
  Lightbulb
} from 'lucide-react'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { getOneFn, createOne } from '@/api/workspace/Api'
import useGlobalStore from '@/state/GlobalState'
// import { ArrowUpRight } from 'lucide-react'
import adoerImg from '../../../public/images/adoerLogo.svg'
import GoogleIcon from '../icons/GoogleIcon'
import InstagramIcon from '../icons/InstagramIcon'
import RedditIcon from '../icons/RedditIcon'
const UserTypeModal = () => {
  const { user } = useGlobalStore((state) => ({
    user: state.user
  }))
  const bearerToken = user?.token as string

  const { onOpenChange } = useDisclosure()
  const [modalOpen, setModalOpen] = React.useState<boolean>(true)
  const [role, setRole] = React.useState<string>('')
  const [source, setSource] = React.useState<string>('')

  const occupationOptions = [
    {
      label: 'Founder / Co-Founder',
      value: 'Founder / Co-Founder',
      icon: <Lightbulb size={14} />
    },
    {
      label: 'Content Creator',
      value: 'Content Creator',
      icon: <Video size={14} />
    },
    { label: 'Student', value: 'Student', icon: <BookText size={14} /> },
    {
      label: 'Working Professional',
      value: 'Working Professional',
      icon: <CodeXml size={14} />
    },
    { label: 'Freelancer', value: 'freelancer', icon: <Briefcase size={14} /> },
    {
      label: 'Licensed Professional',
      value: 'Licensed Professional',
      icon: <Scale size={14} />
    }
  ]

  const sourceOptions = [
    { label: 'LinkedIn', value: 'linkedIn', icon: <Linkedin size={14} /> },
    { label: 'Google', value: 'google', icon: <GoogleIcon size={16} /> },
    {
      label: 'Instagram',
      value: 'instagram',
      icon: <InstagramIcon size={14} />
    },
    { label: 'Reddit', value: 'reddit', icon: <RedditIcon size={18} /> },
    {
      label: 'Refered by friend',
      value: 'referedByFriend',
      icon: <UserRound size={14} />
    }
  ]

  React.useEffect(() => {
    const checkUserType = async () => {
      try {
        const response = await getOneFn(`/profile/check-user-type`, bearerToken)
        console.log(response.data.success)
        if (response.data.success === false) {
          setModalOpen(true)
        } else {
          setModalOpen(false)
        }
      } catch (error) {
        console.error('Error fetching profile details:', error)
      }
    }
    checkUserType()
  }, [])

  const payload = {
    userType: role,
    source: source
  }

  const handleSubmitDetails = async (e: any) => {
    e.preventDefault()
    if (!role || !source) {
      toast.error('all fields are compulsory')
      setModalOpen(true)
      return
    } else {
      await createOne(`/profile/update-user-type`, bearerToken, payload)
      setModalOpen(false)
      window.location.reload()
      return
    }
  }
  const handleRoleChange = (selectedOccupation: string) => {
    setRole(selectedOccupation)
  }
  const handleSourceClick = (selectedOption: string) => {
    setSource(selectedOption)
  }

  return (
    <>
      <Modal
        // isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='h-screen max-w-fit items-center bg-[#ffffff] xs:overflow-y-auto xs:overflow-x-hidden'
        // isOpen={false}
        isOpen={modalOpen}
        hideCloseButton={true}
      >
        <ModalContent className='!m-0 max-w-full'>
          {(onClose) => (
            <>
              <div className='absolute top-24 h-14 w-14 [@media(min-width:408px)_and_(max-width:915px)]:top-28'>
                <img
                  src={adoerImg}
                  alt='adoer.logo'
                  className='h-[100%] w-[100%]'
                />
              </div>
              <ModalBody className='items-center justify-center'>

                <form onSubmit={handleSubmitDetails}>
                  <CardHeader className='mb-6 text-center md:mt-0'>
                    <CardTitle className='mb-2 text-2xl'>
                      What do you do?
                    </CardTitle>
                    <CardDescription className=''>
                      We will optimise Adoer accordingly for your best use
                    </CardDescription>
                  </CardHeader>

                  <div className=''>
                    <Select
                      label='Select Occupation'
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0]
                        handleRoleChange(selectedKey as string)
                      }}
                      classNames={{
                        base: 'w-full',
                        trigger: `
                      mb-8 !rounded-xl !bg-background !outline-dashed !outline-offset-0 
                      !outline-[#EDEDED]  px-4 
                      !focus:outline-[#a5a5a5] focus:border-transparent  !border-none 
                      `
                      }}
                    >
                      {occupationOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className='w-full'
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label='Where did you hear about us'
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0]
                        handleSourceClick(selectedKey as string)
                      }}
                      classNames={{
                        base: 'w-full',
                        trigger: `
                      mb-8 !rounded-xl !bg-background !outline-dashed !outline-offset-0 
                      !outline-[#EDEDED]  px-4 
                      !focus:outline-[#a5a5a5] focus:border-transparent  !border-none 
                      `
                      }}
                    >
                      {sourceOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          startContent={option.icon}
                          className='w-full'
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button
                      type='submit'
                      className='mt-4 w-full bg-[#1877F2] text-white'
                      onPress={onClose}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

// const UserTypeCard = ({ imageSrc, title, onSelect, isSelected }: any) => {
//   return (
//     <div
//       onClick={() => onSelect(title)}
//       className={`card-container cursor-pointer rounded-lg border p-4 shadow-lg ${
//         isSelected
//           ? 'border-gray-300 bg-blue-600'
//           : 'border border-border opacity-75'
//       } group hover:border-gray-300 hover:bg-blue-400 hover:text-white`}
//     >
//       <div className='image-container mb-4 flex justify-center'>
//         <img src={imageSrc} alt={title} className='h-20 w-20 object-cover' />
//       </div>
//       <div className='text-center'>
//         <h3
//           className={`card-title text-md font-semibold group-hover:text-white ${isSelected ? 'text-white' : 'text-black'}`}
//         >
//           {title}
//         </h3>
//       </div>
//     </div>
//   )
// }

export default UserTypeModal
