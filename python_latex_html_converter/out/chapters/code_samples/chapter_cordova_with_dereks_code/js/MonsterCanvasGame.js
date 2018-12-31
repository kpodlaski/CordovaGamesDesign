/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* A CanvasGame that implements collision detection.                       */
/* The game allows the user to walk a skeleton around a maze.              */
/* If the skeleton is guided to the maze exit, then a win message appears. */


class MonsterCanvasGame extends CanvasGame
{
    constructor(obstaclesImage)
    {
        super();

        /* this.monsterObstalesCtx will be used for collision detection */
        let monsterObstalesOffscreenCanvas = document.createElement('canvas');
        monsterObstalesOffscreenCanvas.width = canvas.width;
        monsterObstalesOffscreenCanvas.height = canvas.height;
        this.monsterObstalesCtx = monsterObstalesOffscreenCanvas.getContext('2d');
        this.monsterObstalesCtx.drawImage(obstaclesImage, 0, 0, canvas.width, canvas.height);

        this.screenShakeInterval = null;
        this.screenIsRotatingToTheLeft = false;
        this.NUMBER_OF_SCREEN_SHAKES_INTERATIONS = 10;
        this.numberOfScreenShakes = 0;
    }

    collisionDetection()
    {
        if (!this.monsterObstalesCtx)
        {
            return;
        }

        let imageData = this.monsterObstalesCtx.getImageData(gameObjects[MONSTER].getX(), gameObjects[MONSTER].getY(), 1, 1);
        let dataTop = imageData.data;
        imageData = this.monsterObstalesCtx.getImageData(gameObjects[MONSTER].getX() + gameObjects[MONSTER].getWidth() * 0.8, gameObjects[MONSTER].getY(), 1, 1);
        let dataRight = imageData.data;
        imageData = this.monsterObstalesCtx.getImageData(gameObjects[MONSTER].getX(), gameObjects[MONSTER].getY() + gameObjects[MONSTER].getHeight() * 0.8, 1, 1);
        let dataBottom = imageData.data;
        imageData = this.monsterObstalesCtx.getImageData(gameObjects[MONSTER].getX() + gameObjects[MONSTER].getWidth() * 0.8, gameObjects[MONSTER].getY() + gameObjects[MONSTER].getHeight() * 0.8, 1, 1);
        let dataLeft = imageData.data;
        if ((dataTop[3] !== 0) || (dataRight[3] !== 0) || (dataBottom[3] !== 0) || (dataLeft[3] !== 0))
        {
            if (gameObjects[MONSTER].getDirection() === UP)
            {
                gameObjects[MONSTER].setDirection(DOWN);
                gameObjects[MONSTER].setY(gameObjects[MONSTER].getY() + 5);
            }
            else if (gameObjects[MONSTER].getDirection() === DOWN)
            {
                gameObjects[MONSTER].setDirection(UP);
                gameObjects[MONSTER].setY(gameObjects[MONSTER].getY() - 5);
            }
            else if (gameObjects[MONSTER].getDirection() === LEFT)
            {
                gameObjects[MONSTER].setDirection(RIGHT);
            }
            else if (gameObjects[MONSTER].getDirection() === RIGHT)
            {
                gameObjects[MONSTER].setDirection(LEFT);
            }

            if (this.screenShakeInterval === null)
            {
                this.screenShakeInterval = setInterval(this.shakeScreen.bind(this), 10);
            }

        }
        else if (gameObjects[BULLSEYE].pointIsInsideBullseyeRectangle(gameObjects[MONSTER].getX() + gameObjects[MONSTER].getWidth() * 0.5, gameObjects[MONSTER].getY() + gameObjects[MONSTER].getHeight() * 0.5))
        {
            /* Player has won */
            for (let i = 0; i < gameObjects.length; i++) /* stop all gameObjects from animating */
            {
                gameObjects[i].stop();
            }
            gameObjects[WIN_MESSAGE] = new StaticText("Well Done!", 20, 280, "Times Roman", 100, "red");
            gameObjects[WIN_MESSAGE].start(); /* render win message */
        }
    }

    render()
    {
        ctx.save();
        if (this.screenShakeInterval !== null) // hit an obstacle
        {
            if (this.screenIsRotatingToTheLeft)
            {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(Math.radians(1));
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }
            else
            {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(Math.radians(-1));
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
            }
        }

        super.render();
        ctx.restore();
    }

    shakeScreen()
    {
        if (this.screenIsRotatingToTheLeft)
        {
            this.screenIsRotatingToTheLeft = false;
        }
        else // screen is rotating to the right
        {
            this.screenIsRotatingToTheLeft = true;
        }
        this.numberOfScreenShakes++;
        if (this.numberOfScreenShakes >= this.NUMBER_OF_SCREEN_SHAKES_INTERATIONS)
        {
            this.numberOfScreenShakes = 0;
            clearInterval(this.screenShakeInterval);
            this.screenShakeInterval = null;
        }
    }
}