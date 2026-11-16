import unittest
from xml.etree import ElementTree
from livelychart_svg import render_bars

class RenderTests(unittest.TestCase):
    def test_svg(self):
        svg = render_bars([("A", 10), ("B", 5)])
        self.assertEqual(ElementTree.fromstring(svg).tag, "{http://www.w3.org/2000/svg}svg")

if __name__ == "__main__": unittest.main()
