
import clsx from 'clsx'
import {FC} from 'react'
import {
  defaultAlerts,
  KTIcon,
  toAbsoluteUrl,
} from '../../../helpers'

type Props = {
  backgrounUrl: string
}

const HeaderNotificationsMenu: FC<Props> = ({backgrounUrl}) => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
    data-kt-menu='true'
  >
    <div
      className='d-flex flex-column bgi-no-repeat rounded-top'
      style={{backgroundImage: `url('${toAbsoluteUrl(backgrounUrl)}')`}}
    >
      <h3 className='text-white fw-bold px-9 mt-10 mb-6'>
        Notifications <span className='fs-8 opacity-75 ps-3'>24 reports</span>
      </h3>

    </div>

    <div className='tab-content'>
      <div className='tab-pane fade show active' id='kt_topbar_notifications_1' role='tabpanel'>
        <div className='scroll-y mh-225px my-5 px-8'>
          {defaultAlerts.map((alert, index) => (
            <div key={`alert${index}`} className='d-flex flex-stack py-4'>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-35px me-4'>
                  <span className={clsx('symbol-label', `bg-light-${alert.state}`)}>
                    {' '}
                    <KTIcon iconName={alert.icon} className={`fs-2 text-${alert.state}`} />
                  </span>
                </div>

                <div className='mb-0 me-2'>
                  <a href='#' className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
                    {alert.title}
                  </a>
                  <div className='text-gray-500 fs-7'>{alert.description}</div>
                </div>
              </div>

              <span className='badge badge-light fs-8'>{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  </div>
)

export {HeaderNotificationsMenu}
