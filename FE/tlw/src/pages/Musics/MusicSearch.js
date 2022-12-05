import { Link } from "react-router-dom";

const Home = () => {
    // const navigate = useNavigate();

    // const musicClickHandle = (musicSeq) => {
    //     //음악을 클릭했을 때!
    //     console.log(musicSeq);
    //     navigate("/musics/" + musicSeq);
    // };


    return (
        <div className="body">
            피융피융
            <Link to={`/musics/1`} > 니 더러운 침대 </Link>
        </div>
    );
};
export default Home;