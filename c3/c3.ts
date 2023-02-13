/*
 * C3 linearization algorithm.
 */

type ClassMapping = {[k: string]: string[]};

// Returns a linearization for every class in the mapping.
export default function c3(parentsMap: ClassMapping): ClassMapping {
  const linearizations : ClassMapping = {};
  for (const className in parentsMap) {
    // Run the linearization for each class.
    linearize(className, parentsMap, linearizations, []);
  }
  return linearizations;
}

// Linearizes a class MRO, saving the result in linMap.
// Throws an error if there is a cycle in the hierarchy.
function linearize(
  cName: string, 
  pMap: ClassMapping, 
  linMap: ClassMapping, 
  descendants: string[]
): void {
  // Skip if already in the linearization map.
  if (cName in linMap) return;  
  const parents = pMap[cName];
  // Get the linearization of each parents.
  // If any parent is also a descendant, there is a cycle.
  descendants.push(cName);
  for(const parent of parents) {
    if (parent in linMap)
      continue; // already linearized.
    if (descendants.includes(parent)) // p -> class -> p situation
      throw new Error('cycle detected linearizing ' + cName);
    linearize(parent, pMap, linMap, descendants);
  }
  descendants.pop();
  // Merge the linearization of the parents and the parents list.
  linMap[cName] = merge(cName, pMap, linMap);
}

// Merges a list of linearizations.
function merge(
  cName: string, 
  pMap: ClassMapping, 
  linMap: ClassMapping
): string[] {
  const classLinearization = [cName];
  // Set up the lists to merge: parents linearizations + parent list.
  // We assume there are no cycles here, so no list will contain cName.
  let mergeLists = pMap[cName].map(parent => linMap[parent].slice());
  mergeLists.push(pMap[cName].slice());
  mergeLists = mergeLists.filter(lst => lst.length > 0);
  // Process until all lists to merge are used up.
  while(mergeLists.length > 0) {
    // Find all the heads.
    const candidateHeads = mergeLists.map(lst => lst[0]);
    // Choose the first head that's not in any tail.
    const validHeads = candidateHeads.filter(head => 
      !mergeLists.some(lst => lst.includes(head, 1)));
    if (validHeads.length === 0)
      throw new Error('could not choose a valid head');
    const head = validHeads[0];
    // Add the head to the linearization.
    classLinearization.push(head);
    // Remove the chosen head from all lists.
    // Then remove all empty lists.
    mergeLists.forEach(lst => {
      if (lst[0] === head)
        lst.splice(0, 1);
    });
    mergeLists = mergeLists.filter(lst => lst.length > 0);
  }
  return classLinearization;
}