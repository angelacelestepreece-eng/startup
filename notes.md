# CS 260 Notes

## First Notes

I learned a lot about how to commit, push, and pull. I also learned how to clone a repository. I also learned how to make changes using VS Code and GitHub web console.

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.84.21.223
I followed all the instructions and it made sense! At first to see if it was working I put in https://54.84.21.223 and that did not work. But I saw the common problems and the bottom and I realized that I needed to put http not https. Now everything is working.

## Caddy

Got a domain name: groupgoal.click
I followed all the instructions and it made sense. I can now open the link and it is secure! I can open it using https://groupgoal.click.

## HTML

I learned a lot on how to actually use HTML. I know how to add images, links, and making headers/footers. 

Link to my startup HTML: https://startup.groupgoal.click.

Going through the Simon code, really helped me get a feel as to how to actually implement an application.

## CSS

One thing that I found very interesting from going through these modules is how websites can be formatted differently for different screen sizes. I've always wondered how an application can do that, and now I know. I also liked learning about Bootstrap, and I agree that the Bootstrap button compared to the plain button is much better. It creates a better aesthetic to the page. 

## React Part 1: Routing

## Notes for the test:
1) In the following code, what does the link element do?
   
  link element connects external resources like stylesheets to the HTML document
  
2) In the following code,  what does a div tag do?
   
  It defines a generic container for content, often used for layout and styling
  
3) In the following code, what is the difference between the #title and .grid selector?
   
  #title selects the element with the ID "title", while .grid selects all elements with the class "grid"
  
4) In the following code, what is the difference between padding and margin?
   
   Padding is the space between the content and the border; margin is the space outside the border.
   
5) Given this HTML and this CSS how will the images be displayed using flex?
    
   Unless you override it with flex-direction: column, they will align hosrizontally in a row
   
6) What does the following padding CSS do?
    
   padding: 10px 20px 30px 40px;
   Sets padding of 10px top, 20px right, 30px bottom, 40px left
  
7) What does the following code using arrow syntax function declaration do?
    
    const greet = () => console.log("Hello!");
    Declares a function named greet that logs "Hello!" to the console when called
    
8) What does the following code using map with an array output?
    
    map creates a new array by applying a function to each element of the original array
    [1,2,3].map(n => n * 2) -> [2,4,6]
    
9) What does the following code output using getElementByID and addEventListener?
    
    getElementByID("clickMe") selects the button
    addEventListener("click",...) attaches a click handler
    When the button is clicked, it runs the arrow function that logs the message
    document.getElementById("clickMe").addEventListener("click", () => {
      console.log("Button clicked!");
    });
    This logs "Button clicked!" to the console when the button is clicked.
    
11) What does the following line of Javascript do using a # selector?
    
    documet.querySelector("#title");
    Selects the element with the ID "title". Grabs the first element in the DOM with id="title"
    
12) Which of the following are true? (mark all that are true about the DOM)
    
    The DOM represents the structure of a webpage as a tree of objects
    The DOM allows JavaScript to manipulate HTML and CSS
    
13) By default, the HTML span element has a default CSS display property value of:
    
    inline - it flows with surrounding text and doesn't start on a new line
    block elements (div and p) take up the full width
    flex and none are not default values for span
    
14) How would you use CSS to change all the div elements to have a background color of red?
    
    div {background-color: red;}
    
15) How would you display an image with a hyperlink in HTML?
    
    "<a /href="link.html"><img /src="image.jpg">""/a>"
    "<a" - anchor tag, makes it clickable
    
16) In the CSS box model, what is the ordering of the box layers starting at the inside and working out?

    Content(Text or image) -> Padding(Space between content and border) -> Border(Edge around     the element) -> Margin(Space outside the border, separating the elements from others)
        
17) Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?

       <p><span /class="green">trouble</span> double</p> 
       .green {color: green;}
    
18) What will the following code output when executed using a for loop and console.log?

    for (let i = 0; i < 3; i++) {
      console.log(i);
    }
    output: 0 1 2
    
19) How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?

    document.getElementById("byu").style.color = "green";
    querySelector("#byu").style.color = "green"; would also work
    
20) What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

    paragraph: p
    ordered list: ol
    unordered list: ul
    second level heading: h2
    first level heading: h1
    third level heading: h3
    
21) How do you declare the document type to be html?

    "<!DOCTYPE html"

22) What is valid javascript syntax for if, else, for, while, switch statements?

    if: if(x) {}
    else: if(x) {} else {}
    for: for (let i = 0; i < 5; i++) {}
    while: while (condition) {}
    switch:
            switch (expression) {
              case value1:
                  code
              case value2:
                  code
              default:
            }

23) What is the correct syntax for creating a javascript object?

    let obj = {}

24) Is it possible to add new properties to javascript objects?

    Yes

25) If you want to include JavaScript on an HTML page, which tag do you use?

    <script>

26) Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

    <span /id='animal'>animal</span>fish
    document.getElementByID('animal').innerText = 'crow';

27) Which of the following correctly describes JSON?

    A lightweight data-interchange format, JavaScript Object Notation and is used for data        exchange

28) What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?

    chmod: Changes file or directory permissions (read/write/execute)
    pwd: Prints working directory
    cd: Changes the current directory
    ls: List files and directories in the current location
    vim: Opens the Vim text editor
    nano: Opens the Nano text editor
    mkdir: Creates a new directory
    mv: Moves or renames files and directories
    rm: Removes/deletes files or directories
    man: Displays the manual page for a command (man ls)
    ssh: Starts a secure shell session to a remote machine
    ps: Lists running processes
    wget: downloads files from the web via HTTP/HTTPS
    sudo: executes a command with superuser (admin) privileges

30) Which of the following console command creates a remote shell session?

    ssh

31) Which of the following is true when the -la parameter is specified for the ls console command?

    Lists all files including hidden ones with details

32) Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

    top level domain: click
    subdomain: fruit, sub-subdomain: banana
    rootdomain: bozo

33) Is a web certificate is necessary to use HTTPS.

    Yes

34) Can a DNS A record can point to an IP address or another A record.

    To either

35) Port 443, 80, 22 is reserved for which protocol?

    443: HTTPS
    80: HTTP
    22: SSH

36) What will the following code using Promises output when executed?

    Promise.resolve('done').then(console.log);
    done

## React Part 2: Reactivity


