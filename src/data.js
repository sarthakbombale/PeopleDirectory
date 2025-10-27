const names = [
  "Emma Thompson", "Liam Wilson", "Olivia Chen", "Noah Garcia", "Ava Patel",
  "Ethan Rodriguez", "Sophia Kim", "Mason Taylor", "Isabella Martinez", "William Lee",
  "Mia Anderson", "James Johnson", "Charlotte Brown", "Benjamin Davis", "Amelia White",
  "Lucas Smith", "Harper Jones", "Alexander Moore", "Evelyn Clark", "Daniel Miller",
  "Elizabeth Wright", "Michael Turner", "Sofia Adams", "David Cooper", "Victoria Reed",
  "Joseph Baker", "Grace Morgan", "Samuel Phillips", "Chloe Foster", "Matthew Bennett",
  "Zoe Carter", "Christopher Ross", "Lily Stewart", "Andrew Hughes", "Hannah Price",
  "Joshua Coleman", "Aria Wood", "Nathan Perry", "Scarlett Hall", "Ryan Mitchell",
  "Layla Roberts", "Jack Nelson", "Maya Richardson", "Dylan Powell", "Lucy Cox",
  "Tyler Ward", "Audrey Brooks", "Brandon Howard", "Claire Griffin", "Adrian Parker"
];

function generateUsername(name) {
  return name.toLowerCase().replace(' ', '.').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function generateEmail(username) {
  return `${username}@people.co`;
}

export const members = names.map((name, i) => {
  const username = generateUsername(name);
  return {
    id: i + 1,
    name: name,
    username: username,
    status: "Active",
    role: ["Designer", "Developer", "Manager", "Engineer"][
      Math.floor(Math.random() * 4)
    ],
    email: generateEmail(username),
    teams: ["Design", "Product", "Marketing"].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  };
});
  