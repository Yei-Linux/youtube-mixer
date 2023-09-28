import sys
pkg_dir = ".." 
sys.path.append(pkg_dir)

import unittest
from helpers.video_manager import handler_remove

class RemovePartsOfVideo(unittest.TestCase):
     def test_remove_on_empty_list(self):
          rangesConfig = []
          range_got = handler_remove(rangesConfig)
          self.assertEqual(len(rangesConfig), len(range_got))

     def test_remove_on_simple_list_starting_from_beginning(self):
          rangesConfig = [{
               "start": 0,
               "end": 10
          },{
               "start": 30,
               "end": 45
          },{
               "start": 45,
               "end": 55
          }]
          range_got = handler_remove(rangesConfig)
          self.assertEqual(range_got,[{'start': 10, 'end': 30}, {'start': 55, 'end': None}])

     def test_remove_on_simple_list_starting_at_second_item(self):
          rangesConfig = [{
               "start": 18.4,
               "end": 25.6
          },{
               "start": 26.9,
               "end": 30.5
          },{
               "start": 30.5,
               "end": 42
          }]
          range_got = handler_remove(rangesConfig)
          self.assertEqual(range_got,[{'start': 0, 'end': 18.4},{'start': 25.6, 'end': 26.9}, {'start': 42, 'end': None}])

if __name__ == '__main__':
    unittest.main()