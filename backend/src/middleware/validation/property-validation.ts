import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/function';
import { PathReporter } from 'io-ts/lib/PathReporter';
import * as E from 'fp-ts/Either';

// Define the validation schema using io-ts
export const CreatePropertyDto = t.type({
  city: t.string,
  address: t.string,
  totalPieces: t.number,
  availablePieces: t.number,
  soldPieces: t.number,
  unitPrice: t.number,
  imageUrl: t.string,
  status: t.union([
    t.literal('available'),
    t.literal('not_available'),
    t.literal('hidden'),
  ]),
});

// Export the TypeScript type
export type CreatePropertyDtoType = t.TypeOf<typeof CreatePropertyDto>;

// Create a utility function for validation
export const validateCreatePropertyDto = (
  body: unknown,
): E.Either<string, CreatePropertyDtoType> => {
  const validationResult = CreatePropertyDto.decode(body);

  return pipe(
    validationResult,
    fold(
      (errors) => {
        const report = PathReporter.report(E.left(errors)).join(', '); // Join the errors into a string
        return E.left(`Validation error: ${report}`);
      },
      (validInput) => E.right(validInput),
    ),
  );
};

export const UpdatePropertyDto = t.partial({
  availablePieces: t.number,
  soldPieces: t.number,
  status: t.union([
    t.literal('available'),
    t.literal('not_available'),
    t.literal('hidden'),
  ]),
});

export type UpdatePropertyDtoType = t.TypeOf<typeof UpdatePropertyDto>;
