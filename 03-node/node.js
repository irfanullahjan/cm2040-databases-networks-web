let course = {
  name: "Databases, Networks and the Web",
  platform: "Coursera",
  category: "Computer Science",
};

for (key in course) {
    console.log(`${key}: ${course[key]}`);
}