from math import sqrt, pi
import numpy as np
import json
import sys

h = 1


def infinite_well(a, n: int = 1):
    x1 = np.arange(-1.5*a/2, -a/2, 0.01)
    x2 = np.arange(-a/2, a/2, 0.01)
    x3 = np.arange(a/2, 1.5*a/2, 0.01)

    y1 = [0]*len(x1)
    y3 = [0]*len(x3)

    A = sqrt(2/a)
    k = n * pi/a
    if n % 2 == 0:
        y2 = A*np.sin(k*x2)
    else:
        y2 = A*np.cos(k*x2)

    x1 = x1.tolist()
    x2 = x2.tolist()
    x3 = x3.tolist()
    y2 = y2.tolist()

    return x1 + x2 + x3, y1 + y2 + y3


if __name__ == "__main__":
    x, y = infinite_well(float(sys.argv[1]), int(sys.argv[2]))

    print(json.dumps({"x": x, "y": y}))
