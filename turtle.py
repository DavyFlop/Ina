import turtle
import math

t = turtle.Turtle()
t.speed(0)
t.color("red")
turtle.bgcolor("black")

def corazon(n):
    x = 16 * math.sin(n) ** 3
    y = 13 * math.cos(n) - 5 * \
        math.cos(2*n) - 2*math.cos(3*n) - \
        math.cos(4*n)
    return x, y

t.penup()
for i in range(15):
    t.goto(0,0)
    t.pendown()
    for n in range (0,100, 2):
        x, y = corazon(n/10)
        t.goto(x*i, y*i)
    t.penup()

def dessiner_INA():
    t.color("hot pink")
    t.penup()
    t.goto(-90, -30)
    t.pendown()

    t.goto(-90, 60)
    t.penup()
    t.goto(-50, -30)
    t.pendown()

    t.goto(-50, 60)
    t.goto(0, -30)
    t.goto(0, 60)
    t.penup()
    t.goto(30, -30)
    t.pendown()

    t.goto(55, 60)
    t.goto(80, -30)
    t.penup()
    t.goto(40, 10)
    t.pendown()
    t.goto(70, 10)

dessiner_INA()

t.hideturtle()
turtle.done()