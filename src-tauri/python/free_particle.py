from numpy import arange
from math import sqrt, sin, cos
from json_export import to_json
from sys import argv


def free_particle(x0, x1, dx=0.01):
    x = arange(x0, x1, dx)
    # A^2 * (x1-x0) = 1
    A = sqrt(1/abs(x1-x0))
    re = [A*cos(xn) for xn in x]
    im = [A*sin(xn) for xn in x]

    return to_json(
        x,
        re=re,
        im=im
    )


print(free_particle(float(argv[1]), float(argv[2])))
