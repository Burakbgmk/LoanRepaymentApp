# LoanRepaymentApp
A static web application which provides a summary result of repayment and a payment schedule according to entered input parameters by user.

## Project Summary
- This app aims to calculate loan repayment and provide information about payment schedule divided into payment intervals according to user inputs.
- **HTML**, **CSS**, **Javascript** and **React** is used for this project.
- UseState, UseEffect, UseContext, UseRef, UseImperativeHandle and ForwardRef hooks are utilized.
- **Dark mode** can be toggled from a button with the help of UseContext hook.
- Inputted data is transferred to child classes alse by **UseContext** hook.
- Empthy inputs are warned by **validation** functions passed into InputUser component via useRef, useImperativeHandle and forwardRef hooks.
- Inputted data is passed to parent App.js component with a callback function.
- Payment Schedule is shown with a pop up.
- Exporting pdf is utilized for payment schedule by jspdf library.
- Styling is done by plain css.

## UserInput and Result

![image](https://user-images.githubusercontent.com/95534656/190895425-6cb06f9e-6414-4d42-b42a-f9ef8376e010.png)

![image](https://user-images.githubusercontent.com/95534656/190895469-c42a42ab-4bb9-42e2-bd6d-4ac4c0051dc3.png)

## Payment Schedule Table

![image](https://user-images.githubusercontent.com/95534656/190895494-9932995e-7a9c-4102-989b-d4da850f914e.png)

## Imported Pdf Report

![image](https://user-images.githubusercontent.com/95534656/190895525-7f7800f5-3b8b-403c-bc1f-f1aab2d7be3d.png)
