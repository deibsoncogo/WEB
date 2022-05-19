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

export function AsideMenuMain() {
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
      <AsideMenuItem
        to='/categories'
        title='Categorias'
        icon={<BiCategory size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/contents'
        title='Conteudos'
        icon={<RiFileCopy2Fill size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/banners'
        title='Banners'
        icon={<RiPagesLine size={20} className='svg-icon-2 mh-50px' />}
      />
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
      <AsideMenuItem
        to='/planns'
        title='Planos'
        icon={<MdViewList size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/courses'
        title='Cursos'
        icon={<MdOndemandVideo size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/books'
        title='Livros'
        icon={<ImBooks size={20} className='svg-icon-2 mh-50px' />}
      />
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
      <AsideMenuItem
        to='/coupons'
        title='Cupons de Desconto'
        icon={<HiReceiptTax size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/sales'
        title='Vendas'
        icon={<MdReceiptLong size={20} className='svg-icon-2 mh-50px' />}
      />

      {/* Users */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            Gestão de Pessoas
          </span>
        </div>
      </div>
      <AsideMenuItem
        to='/users'
        title='Usuários'
        icon={<MdPeopleAlt size={20} className='svg-icon-2 mh-50px' />}
      />
      <AsideMenuItem
        to='/logout'
        title='Sair'
        icon={<FiLogOut size={20} className='svg-icon-2 mh-50px' />}
      />
    </>
  )
}
