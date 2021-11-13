```dart
List<String> flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune', 'turn'];

for (final object in flybyObjects) {
  print(object); 
  
}
flybyObjects.where((name) => name.contains('turn')).forEach(print); // 判断值里面是否有turn的存在

// jupiter
// Sature
// Uranus
// Ueptune

// turn

```