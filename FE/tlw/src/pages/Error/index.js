import "./index.scss";

const Home = () => {

    // 화면에 그림그리기
    // 프레임마드 코드실행 가능
    // collision check

    const maxSize = Math.max(window.innerWidth, window.innerHeight);


    // 랜덤한 X 위치 값
    const getRandomX = () => Math.random() * maxSize;

    // 랜덤한 Y 위치 값
    const getRandomY = () => Math.random() * maxSize;

    const randomRadius = () => Math.random() * 3;
    const rendering = () => {
        const result = [];
        for (let i = 0; i < 500; i++) {
            const radius = randomRadius();
            result.push(<div className="star" style={{ position: "absolute", left: `${getRandomY()}px`, top: `${getRandomX()}px`, width: `${radius}px`, height: `${radius}px` }}></div>);
        }
        return result;
    };

    return (
        <div className="backSky">
            <div className="sky">
                {rendering()}
            </div>
            <img src="img/Logo.png" style={{ height: "45vh" }} alt="blacktitle" />
            <div className="info">
                <h1>404</h1>
                <span>헉!!! 이곳을 발견 한건</span><br />
                <span>우리들만의 비.밀. 이에요</span>
            </div>
            <img src="img/img404.png" className="spaceMan" alt="spaceMan" />
        </div>
    );
};
export default Home;

