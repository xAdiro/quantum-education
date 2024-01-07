from math import sqrt, pi, sin, cos
from numpy import arange
from json_export import to_json
from sys import argv


def infinite_well(x0, x1, a, n, dx=0.01):
    C = sqrt(2/a)
    k = n * pi / a

    x = arange(x0, x1, dx)

    psi = [C*sin(k*xp) for xp in x]

    if n % 2 == 0:
        return to_json(
            x.tolist(),
            re=psi,
            psi_sq=[y**2 for y in psi]
        )
    else:
        return to_json(
            x.tolist(),
            [C*cos(k*xp) for xp in x]
        )


print(infinite_well(float(argv[1]), float(
    argv[2]), float(argv[3]), float(argv[4])))