import { AsideMenuItem } from './AsideMenuItem'

import { ImBooks } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'
import { BiCategory } from 'react-icons/bi'
import { HiReceiptTax } from 'react-icons/hi'
import { BsMegaphoneFill, BsCast } from 'react-icons/bs'
import {
  MdHomeFilled,
  MdViewList,
  MdOndemandVideo,
  MdPeopleAlt,
  MdReceiptLong,
} from 'react-icons/md'
import { RiPagesLine, RiFileCopy2Fill, RiArtboardFill } from 'react-icons/ri'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { makeRemoteLogout } from '../../../application/factories/usecases/remote-logout-factory'
import { UserLogout } from '../../../domain/models/userLogout'
import jwtDecode from 'jwt-decode'
import { keys } from '../../../helpers/KeyConstants'
import { IToken } from '../../../interfaces/application/token'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { roleOptions } from '../../../utils/selectOptions'
import { roles } from '../../../application/wrappers/authWrapper'

export function AsideMenuMain() {
  const [isAdmin, setIsAdmin] = useState(false)
  const route = useRouter()


  useEffect(()=>{

    const token = localStorage.getItem(keys.TOKEN)
    if (token) {
      const values = jwtDecode<IToken>(token)
     setIsAdmin(values.role === roles.ADMIN)
    }

  }, [])

  const logout = () => {
    const requestLogout = makeRemoteLogout()
    const userId = localStorage.getItem(keys.TOKEN)

    if (!!userId) {
      try {
        requestLogout.logout(new UserLogout(jwtDecode<IToken>(userId).id))
        localStorage.clear()
        route.push('/')
        toast.success('Logout efetuado com sucesso')
      } catch (err) {
        toast.error('Não foi possível sair da conta. Tente mais tarde.')
      }
    }
  }
  return (
    <>
      {/* Home */}
      <div className='menu-item'>
        <div className='menu-content pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Home</span>
        </div>
      </div>
      <AsideMenuItem
        to='/dashboard'
        title='Página inicial'
        icon={<MdHomeFilled size={20} className='svg-icon-2 mh-50px' />}
      />

      {/* Portal */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Portal</span>
        </div>
      </div>
      {isAdmin &&
      <AsideMenuItem
        to='/categories'
        title='Categorias'
        icon={<BiCategory size={20} className='svg-icon-2 mh-50px' />}
      />}
      {isAdmin &&
      <AsideMenuItem
        to='/contents'
        title='Conteudos'
        icon={<RiFileCopy2Fill size={20} className='svg-icon-2 mh-50px' />}
      />}
      {isAdmin &&
      <AsideMenuItem
        to='/banners'
        title='Banners'
        icon={<RiPagesLine size={20} className='svg-icon-2 mh-50px' />}
      />}
      <AsideMenuItem
        to='/alerts'
        title='Avisos'
        icon={<BsMegaphoneFill size={16} className='svg-icon-2 mh-50px' />}
      />

      {/* E-Commerce */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>E-Commerce</span>
        </div>
      </div>
      {isAdmin &&
      <AsideMenuItem
        to='/plans'
        title='Planos'
        icon={<MdViewList size={20} className='svg-icon-2 mh-50px' />}
      />}
     
      <AsideMenuItem
        to='/courses'
        title='Cursos'
        icon={<MdOndemandVideo size={20} className='svg-icon-2 mh-50px' />}
      />

      {isAdmin &&
      <AsideMenuItem
        to='/books'
        title='Livros'
        icon={<ImBooks size={20} className='svg-icon-2 mh-50px' />}
      />}
      <AsideMenuItem
        to='/trainings'
        title='Treinamentos'
        icon={<BsCast size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/rooms'
        title='Salas'
        icon={<RiArtboardFill size={20} className='svg-icon-2 mh-50px' />}
      />
      {isAdmin &&
      <AsideMenuItem
        to='/coupons'
        title='Cupons de Desconto'
        icon={<HiReceiptTax size={20} className='svg-icon-2 mh-50px' />}
      />}
      {isAdmin &&
      <AsideMenuItem
        to='/sales'
        title='Vendas'
        icon={<MdReceiptLong size={20} className='svg-icon-2 mh-50px' />}
      />}

      {/* Users */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            Gestão de Pessoas
          </span>
        </div>
      </div>
      {isAdmin &&
      <AsideMenuItem
        to='/users'
        title='Usuários'
        icon={<MdPeopleAlt size={20} className='svg-icon-2 mh-50px' />}
      />}

      <div className='menu-item'>
        <a className={clsx('menu-link without-sub', { active: false })} onClick={logout}>
          <span className='menu-icon'>{<FiLogOut size={20} className='svg-icon-2 mh-50px' />}</span>
          <span className='menu-title'>sair</span>
        </a>
      </div>
    </>
  )
}
