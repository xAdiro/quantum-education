from numpy import linspace
from math import sqrt, sin, cos
from json_export import to_json
from sys import argv


def free_particle(x0, x1, m, v, h_, samples=1000):

    x = linspace(x0, x1, samples)
    # A^2 * (x1-x0) = 1
    A = sqrt(1/abs(x1-x0))
    k = 1/h_ * m * v
    re = [A*cos(xn*k) for xn in x]
    im = [A*sin(xn*k) for xn in x]
    psi_sq = [A for _ in x]

    return to_json(
        x,
        re=re,
        im=im,
        psi_sq=psi_sq
    )


print(free_particle(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5])))
