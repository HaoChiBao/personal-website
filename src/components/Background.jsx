import sky from '../assets/sky (3).mp4'
import './css/Background.css';

const Background = () => {
    return (
        <video autoPlay loop muted className="background-video">
            <source src={sky} type="video/mp4" />
        </video>
    )
}

export default Background;