import json


def clean_trail_data(file_path):
    with open(file_path, 'r') as f:
        trails = json.load(f)

    cleaned_trails = []
    seen_trails = set()

    for trail in trails:
        # Remove trails from Wyoming
        if ", CO" not in trail['location']:
            continue

        # Identify duplicates by name and location
        trail_identifier = (trail['name'], trail['location'])
        if trail_identifier not in seen_trails:
            cleaned_trails.append(trail)
            seen_trails.add(trail_identifier)

    with open(file_path, 'w') as f:
        json.dump(cleaned_trails, f, indent=2)


if __name__ == "__main__":
    json_file_path = "/Users/troyowens/Desktop/Programming_Docs/wdd231_team/trailFinder/src/scripts/trail-data.json"
    clean_trail_data(json_file_path)
    print(f"Cleaned trail data written to {json_file_path}")
