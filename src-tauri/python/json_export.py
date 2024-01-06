from json import dumps


def to_json(x: list[float], **y: list[float]) -> str:
    result = {}

    for key, val in y.items():
        data = [{"x": x0, "y": y0} for x0, y0 in zip(x, val)]
        result[key] = data
    return dumps(result)
