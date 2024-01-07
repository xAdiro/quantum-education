from numpy import arange
from math import sqrt, sin, cos
from json_export import to_json
from sys import argv


def free_particle(x0, x1, m, E, h_, dx=0.01):

    x = arange(x0, x1, dx)
    # A^2 * (x1-x0) = 1
    A = sqrt(1/abs(x1-x0))
    k = 1/h_*sqrt(2*m*E)
    re = [A*cos(xn) for xn in x]
    im = [A*sin(xn) for xn in x]

    return to_json(
        x,
        re=re,
        im=im
    )


print(free_particle(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5])))
