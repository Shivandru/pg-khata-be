export function buildBeds(propertyId, roomId, bedCount) {
    return Array.from({ length: bedCount }, (_, index) => ({
        propertyId,
        roomId,
        label: String.fromCharCode(65 + index), // A, B, C, D...
        isOccupied: false,
    }));
}
//# sourceMappingURL=bed.js.map