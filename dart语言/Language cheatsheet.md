### Null-aware operators
Dart offers some handy operators for dealing with values that might be null. One is the ??= assignment operator, which assigns a value to a variable only if that variable is currently null:
```dart
int? a; // = null
a ??= 3;
print(a); // <-- Prints 3.

a ??= 5;
print(a); // <-- Still prints 3.
```
Another null-aware operator is ??, which returns the expression on its left unless that expression’s value is null, in which case it evaluates and returns the expression on its right:
```dart
print(1 ?? 3); // <-- Prints 1.
print(null ?? 12); // <-- Prints 12.
```
### Conditional property access
To guard access to a property or method of an object that might be null, put a question mark (?) before the dot (.):
```dart
myObject?.someProperty;
```

The preceding code is equivalent to the following:
```dart
(myObject != null) ? myObject.someProperty : null
```

You can chain multiple uses of ?. together in a single expression:
```dart

myObject?.someProperty?.someMethod()

```

### Collection literals
Dart has built-in support for lists, maps and sets. You can create them using literals:
```dart
final aListOfStrings = ['one', 'two', 'three'];
final aSetOfStrings = {'one', 'two', 'three'};
final aMapOfStringsToInts = {
  'one': 1,
  'two': 2,
  'three': 3,
};
```
```dart
List<String> aListOfStrings = ['one', 'two', 'three'];
Set<String> aSetOfStrings = { 'one', 'two', 'three' };
Map<String, int> aMapOfStringsToInts = {
  'one': 1,
  'two': 1,
  'three': 3
};
```
```dart
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};

final aListOfBaseType = <BaseType>[SubType(), SubType()];
```

### Arrow syntax
You might have seen the => symbol in Dart code. This arrow syntax is a way to define a function that executes the expression to  its right and returns its value.

For example, consider this call to the List class's any() method:
``` dart
bool hasEmpty = aListOfStrings.any((s) {
  return s.isEmpty;
})
```
Here's a simpler way to write that code:
```dart
bool hasEmpty = aListOfStrings.any((s) => s.isEmpty);
bool hasEmpty2 = aListOfStrings.every((s) => s.isEmpty);
```

### Cascades

To perfrom a sequence of operations on the same object, use cascades(..). We've all seen an expression like this:
```
myObject.someMethod();
```
It invokes `someMethod()` on `myObject`, and this result of the expression is return value of someMethod().
Here's the same expression with a cascade:
```dart
myObject..someMethod();
```
Although it still invokes `someMethod()` on `myObject`, the result of the expression isn't the return value - it's a reference to `myObject`!

Using cascades, you can chain together operations that would otherwise require separate statements. For example, consider the
following code, which uses the conditional member access operator (?.) to read properties of `button` if it isn't `null`;

``` dart
var button = querySelector('#confirm');
button?.text = 'Confirm';
button?.classes.add('imprtant');
button?.onClick.listen((e) => window.alert('Confiirmed!'));
```

To instead use cascades, you can start with the null-sgirtubg cascade (?..). which gurantees that none of the cascade
operations are attempted on a null object. Using cascades shortens the code and makes the button variable unnecessary:
```dart
querySelector('#confirm')
  ?..text = 'Confirm'
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

### Getters and setters
You can define getters and setters whenever you need more control over a property than a simple field allows.
For example, you can make sure a property's valuie is valid;

```dart
class MyClass {
  int _aProperty = 0;
  int get aProperty => _aProperty;
  set aProperty(int value) {
    if (value >= 0) {
      _aProperty = value;
    }
  }
}
```
You can also use a getter to define a computed property:
```dart
class MyClass {
  final List<int> _values = [];
  void addValue(int value) {
    _values.add(value);
  }

  // A computed property.
  int get count {
    return _values.length;
  }
}
```

### Optional positional parameters
Dart has two kinds of function parametersL positional and named. Positional parameters are the kind you're likely familiar with:
```dart
int sumUp(int a, int b, int c) {
  return a + b + c;
}

int total = sumUp(1, 2, 3);
```

With Dart, you can make these positional parameter optional by wrapping them in brackets:
```dart
int sumUpToFive(int a, [int? b, int? c, int? d, int? e]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
  return sum;
}
int total = sumUpToFive(1, 2);
int otherTotal = sumUpToFive(1, 2, 3, 4, 5);
```

Optional positional parameters are alwarys last in a function's paramenter list. Their default value is null unless you provide another default value:
```dart
int sumUpToFive(int a, [int b = 2, int c = 3, int d = 4, int e = 5]) {

}
int newTotal = sumUpToFive(1);
print(newTotal);// <-- prints 15

```

### Optional named parameters
Using a curly brace syntax, you can define optional parameters that have names.
```dart
void printName(String firstName, String lastName, { String? suffix }) {
  print('$firstName $lastName ${suffix ?? ''}');
}
printName('Avinash', 'Gupta');
printName('Poshmeister', 'Moneybuckets', suffix: 'IV');
```

As you might expect, the default value of an optional named parameter is null, but you can provide a default value.
If the type of parameter is non-nullable, then you must either provide a default value(as shown in the following code) or mark
the parameter as required(as shown in the constructor section).

A function can’t have both optional positional and optional named parameters.

### Exceptions
Dart cide cab throw and catch exceptions. n constrast to Java, all of Dart's excetions are unchecked exceptions. Methods don't
declare which exceptions they might throw. and you aren't required to catch any exceptions.

Dart provides Exception and Error types. but you're allowed to throw any non-null object:
```dart
throw Exception('Something bad happend.');
throw 'Waaaaah!';
```
Use the try,on,and catch keywords when handing execptions;
```dart
try {
  breadMoreLlams();
} on OutOfLlamasException {
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch(e) {
  // No specified type, handles all
  print('Something really unknown:$e');
}
```
The try keyword workds as it does in most other languages. Use the on keyword to filter for specific exceptions by type, and the catch keyword to get a reference to the exception object.
If you can't competely handle the exception. use the `rethrow` keyword to propagate the exception:
```dart
try {
  breadMoreLlamas();
} catch (e) }{
  print('I was just trying to breed llamas!');
  rethrow;
}


```
To excecute code whether or not an exception is thrown, use finally:
```dart
try {
  breadMoreLlamas();
} catch (e) {

} finally {
  cleanLlamaStatlls();
}
```

### Using this in a constructor
Dart provides a handy shortcut for assigning values to properties in a constructor: use this.propertyName when declaring the constructor:
```dart
class MyColor {
  int red;
  int green;
  int blue;
  MyColor(this.red, this.green, this.blue);
}
final Color = MyColor(80, 80, 128);
```
This technique works for named parameters, too. Property names become the names of the parameters:
```dart
class MyColor {
  MyColor({ required this.red, required this.green, required this.blue });
}
final color = MyColor(red: 80, green: 80, blue: 89);
```
In the preceding code, red, green, and blue are marked as required because these int values can't be null. If you add default values. your can omit required:
```dart
MyColor([this.red = 0, this.green = 0, this.blue = 0]);
// or
MyColor({this.red = 0, this.green = 0, this.blue = 0});
```

### Initializer lists
Somethimes when you implement a constructor. you need to do some setup before the constructor body executes. For example, final fieleds must have values before the constructor body executes. Do this work in an initializer list. which goes between the constructor's signature and its body:
```dart
Point.fromJson(Map<String, double> json): x = json['x']!, y = json['y']! {
  print('In Point.fromJson(): ($x, $y)');
}
```
The initilalizer list is also a handy place to put asserts, which run only during development:
```dart
NonNegativePoint(this.x, this.y)
  : assert(x >= 0),
  : assert(y >= 0) {
    print('I just made a NonNegativePoint: ($x, $y)');
  }
```

### Named constructors
To allow classes to have multiple constructors, Dart supports named constructors:
```dart
class Point {
  double x, y;
  Point(this.x, this.y);
  Point.origin()
    : x = 0,
      y = 0;
}
```
To use a named constructor, invoke it using its full name:
```dart
final myPoint = Point.origin();
```

### Factory constructors
Dart supports factory constructors, which can return subtypes or even null. To create a factory constructor, use the factory keyword:
```dart
class Square extends Shape{}
class Circle extends Shape{}

class Shape{
  Shape();
  factory Shape.fromTypeName(String typeName) {
    if (typeName == 'square') return Square();
    if (typeName == 'circle') return Circle();
    throw ArgumentError('Unrecognized $typeName');
  }
}
```

### Redirecting constructor
Sometimes a constructor's only purpose is to redirect to another constructor in the same class. A redirecting constructors's body is empty, with the constructor call appearing after a colon(:).
```dart
class Automobile {
  String make;
  String model;
  int mpg;
  // The main constructor for this class.
  Automobile(this.make, this.model, this.mpg);

  // Delegates to the main constructor.
  Automobile.hybrid(String make, String model) : this(make, model, 60);

  // Delegates to a named constructor
  Automobile.fancyHybrid() : this.hybrid('Futurecar', 'Mark 2');
}
```

### Const constructors
If you class produces objects that never change, you can make these objects complie-time constants. To do this, define a const
constructor and make sure that all instance variable are final.
```dart
class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);
  final int x;
  final int y;

  const ImmutablePoint(this.x, this.y);
}
```
