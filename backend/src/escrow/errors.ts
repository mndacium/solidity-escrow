export class ContractNotFoundError extends Error {
  constructor(public readonly contractAddress: string) {
    super(`Contract not found at address: ${contractAddress}`);
  }
}
