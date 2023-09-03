import bg from '../assets/footer-bg.jpg';
import '../css/PageHeader.css'
const PageHeader = ({children}) => {
  return (
    <div className='page-header' style={{backgroundImage: `url(${bg})`}}>
        {children}
    </div>
  )
}

export default PageHeader