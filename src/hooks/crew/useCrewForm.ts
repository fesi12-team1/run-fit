import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationOptions } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  CrewRequestBody,
  UpdateCrewDetailRequestBody,
  UpdateCrewDetailResponse,
} from '@/api/fetch/crews';
import {
  useCreateCrew,
  useUpdateCrewDetail,
} from '@/api/mutations/crewMutations';
import {
  crewFormSchema,
  CrewFormValues,
} from '@/components/crew/CrewForm/_schema';
import { ApiError } from '@/lib/error';
import { Crew } from '@/types';

type CreateModeOptions = {
  mode: 'create';
  crewId?: undefined;
  defaultValues: CrewFormValues;
  mutationOptions: UseMutationOptions<
    Crew, // TData = unknown,
    ApiError, // TError = DefaultError,
    CrewRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >;
};

type EditModeOptions = {
  mode: 'edit';
  crewId: number;
  defaultValues: CrewFormValues;
  mutationOptions: UseMutationOptions<
    UpdateCrewDetailResponse, // TData = unknown,
    ApiError, // TError = DefaultError,
    UpdateCrewDetailRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >;
};

type UseCrewFormOptions = CreateModeOptions | EditModeOptions;

export function useCrewForm({
  mode,
  crewId,
  defaultValues,
  mutationOptions,
}: UseCrewFormOptions) {
  const form = useForm<CrewFormValues>({
    resolver: zodResolver(crewFormSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const createMutation = useCreateCrew();
  const updateMutation = useUpdateCrewDetail(crewId ?? 0);

  const submit = form.handleSubmit(async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      city: values.city,
      image: values.image,
    };

    if (mode === 'create') {
      createMutation.mutate(payload, {
        onSuccess: mutationOptions.onSuccess,
      });
    } else {
      updateMutation.mutate(payload, {
        onSuccess: mutationOptions.onSuccess,
      });
    }
  });

  return {
    form,
    submit,
    isPending:
      mode === 'create' ? createMutation.isPending : updateMutation.isPending,
  };
}
