<style type="text/css" id="__TEST_style__">
.TEST_Box_c35bd16c {
    outline: none;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    display: flex;
}
.TEST_Box_6b6556c1 {
    outline: 0;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: right;
    border-radius: 4px;
    user-select: none;
    gap: 20px;
    color: black;
    font-size: 20px;
    background-color: white;
    transition: color 0.5s ease 1, background-color 0.5s ease 1, font-size 1s ease-in-out 1;
    position: relative;
    display: flex;
    animation: move 3s 5, scale 3s 5 ease-in-out;
}
@keyframes move {
    0% {
        transform: translateX(0%);
        opacity: 0;
        easing: ease-in;
    }
    100% {
        transform: translateX(50%);
        opacity: 1;
        cursor: default;
        easing: ease-out;
    }
}
@keyframes scale {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.5);
    }
}
.TEST_Box_6b6556c1.--TEST--dynamic {
    color: blue;
    background-color: pink;
    padding: 0 200px;
}
.TEST_Box_e1490464 {
    outline: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    flex-direction: column;
    display: flex;
    flex-wrap: 0.5;
    content: hiddasdasd;
}
.TEST_Box_3597aa08 {
    outline: none;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    display: grid;
    background-color: gray;
}
.TEST_Button_c1e49f07 {
    outline: none;
    margin: 0 auto;
    padding: 10px 20px;
    box-sizing: border-box;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    font-size: 2rem;
    display: flex;
}

.TEST_Button_c1e49f07:hover {
    color: green;
    background-color: black;
}

.TEST_Button_c1e49f07::after {
    position: absolute;
    content: "hello";
    left: 30px;
    top: 3px;
    font-size: 16px;
    transition: left 0.5s ease 1, top 0.5s ease 1, fontSize 0.5s ease 1;
}

.TEST_Button_c1e49f07::before {
    position: absolute;
    content: "Click to Change Opacity";
    right: -220px;
    top: 0px;
    transition: left 0.5s ease 1, top 0.5s ease 1, fontSize 0.5s ease 1;
}

.TEST_Button_c1e49f07:focus {
    outline: none;
}
.TEST_Button_c1e49f07.--TEST--dynamic {
    background-color: cyan;
    color: black;
}
</style>