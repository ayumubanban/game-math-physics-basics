import { useEffect } from 'react'

const Speed0 = () => {
  let ctx: CanvasRenderingContext2D;
  const canvasId = "viewer"
  let posX = 0;
  const velocityX = 5;
  // https://b.0218.jp/202207202243.html
  // https://github.com/facebook/react/issues/24502#issuecomment-1118867879
  let ignore = false;
  // let intervalID: number | undefined;

  const init = () => {
    // https://stackoverflow.com/questions/13669404/typescript-problems-with-type-system
    // https://stackoverflow.com/questions/12686927/how-to-assert-a-type-of-an-htmlelement-in-typescript?rq=1
    // https://stackoverflow.com/questions/37613981/how-to-use-a-typescript-cast-with-jsx-tsx
    ctx = (document.getElementById(canvasId) as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

    console.log("init")
    setInterval(tick, 100); // 0.1秒につき velocityX は 5 追加される。秒速50px
    // intervalID = setInterval(tick, 100); // 0.1秒につき velocityX は 5 追加される。秒速50px
    // console.log(intervalID)
  }

  const tick = () => {
    posX += velocityX;
    console.log(posX)

    if (posX > 600) posX = 0; // 12秒後に右端にたどり着くというわけか
    paint();
  }

  const paint = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = "white";
    ctx.fillRect(posX, 200, 10, 10);
    // ctx.fill();
  }

  useEffect(() => {
    if (!ignore) {
    // console.log(intervalID)
    // if (!intervalID) {
      console.log("useEffect")
      init();
    }

    return () => {
      ignore = true;
      // intervalID = undefined;
    }
  }, [])

  return (
    <canvas id={canvasId} width={600} height={600} style={{width: 600, height: 600}}>Speed0</canvas>
  )
}

export default Speed0
