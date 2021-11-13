## Classes
Here's an example of a class with three properties. two constructors, and a method. One of the properties can't be set directly, so it's defined using a getter method (instead of a variable).

```dart
class Spacecraft {
  String name;
  DateTime? launchDate;

  // Read-only non-final property
  int? get launchYear => launchDate?.year;

  // Constructor, with syntactic sugar for assignment to members.
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // Named constructor that forwards to the default one.
  Spacecraft.unlaunched(String name) : this(name, null);

  // Method.
  void describe() {
    print('Spacecraft: $name');
    // Type promotion doesn't work on getters.
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years =
          DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```
You might use the Spacecraft class like this:
```dart
var voyager = Spacecraft('Voyager I', DateTime(1977, 9, 5));
voyager.describe();
// Spacecraft: Voyager I
// I/flutter (31148): Launched: 1977 (44 years ago)

var voyager3 = Spacecraft.unlaunched('Voyager III');
voyager3.describe();
// Spacecraft: Voyager III
```

Inheritance
Dart has single inheritance.
```dart
class Orbiter extends Spacecraft {
  double altitude;

  Orbiter(String name, DateTime launchDate, this.alititude):super(name, launchDate);
}
```

Mixins
Mixins are a way of reusing code in multiple class hierarchies. The following is a mixin declaration:

```dart
mixin Piloted {
  int astronauts = 1;
  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

To add mixin's capabilities to a class, just extend the class with the mixin.
```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ...
}
```

### Interface and abstract classes
Dart has no `interface` keyword. Instead, all classes implicitly deine an interface. Therefore, you can implement any class
```dart
class MockSpaceship implements Spacecraft {

}
```
You can create an abstract clas to be extended (or implemented) by a concrete class. Abstract classes can contain abstract methods(with empty bodies).

```dart
abstract class Describable {
  void describe();
  void describeWithEmphasis() {
    print('====');
    describe();
    print('=======');
  }
}
```

Async
Avoid callback hell and make your code much readable by using async and await.

```dart
const oneSecond = Duration(seconds: 1);

Future<void> printWithDelay(String message) async {
  await Future.deleyed(onSeconde);
  print(message);
}
```

The method above is equivalent to:
```dart
Future<void> printWidthDelay(String message) {
  return Futrue.delayed(oneSeconde).then((){
    print(message);
  })
}
```

As the next example shows. async and await help make asynchronous code easy to read.
```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (final object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            'File for $object already exists. It was modified on $modified.');
        continue;
      }
      await file.create();
      await file.writeAsString('Start describing $object in this file.');
    } on IOException catch (e) {
      print('Cannot create description for $object: $e');
    }
  }
}
```

You can also use async*, which gives your a nice, readable way to build streams.
```dart
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (final object in objects) {
    yield '${craft.name} flies by $object';
  }
}
```

## Exceptions
To raise an exception, use throw:

```dart
if (astronauts == 0) {
  throw StateError('No astronauts.');
}
```
To catch an exception, use a try statement with on or catch(or both):
```dart
try {
  for (final object in flybyObjects) {
    var description = await File('$object.txt').readAsString();
    print(description);
  }
} on IOException catch (e) {
  print('Could not describe object: $e');
} finally {
  flybyObjects.clear();
}
```