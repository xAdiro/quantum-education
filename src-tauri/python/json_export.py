from json import dumps
from typing import List


def to_json(x: List[float], **y: List[float]) -> str:
    result = {}

    for key, val in y.items():
        data = [{"x": x0, "y": y0} for x0, y0 in zip(x, val)]
        result[key] = data
    return dumps(result)


def to_json_bulk(x: List[float], E: List[float], **y: List[List[float]]) -> str:
    result = {}
    result["E"] = [[{"x": x[0], "y": En}, {"x": x[-1], "y": En}] for En in E]

    for key, val in y.items():
        data = [[{"x": x0, "y": y0} for x0, y0 in zip(x, yn)] for yn in val]
        result[key] = data
    return dumps(result)
