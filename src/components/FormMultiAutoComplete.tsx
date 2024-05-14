import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import { alphabeticalSortComparator } from '../utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type MultiSelectAutocompleteProps = {
	id: string;
	label: string;
	options: any[];
	getOptionLabel: (item: any) => string;
	onChange: (event: React.SyntheticEvent<Element, Event>, value: any[]) => void;
	onTextChange: (e: React.ChangeEvent<any>) => void;
	data: any;
	touched?: boolean;
	className?: string;
	optionId?: string;
	handleOnBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

const FormMultiAutoComplete = ({
	id,
	label,
	options,
	getOptionLabel,
	onChange,
	onTextChange,
	data,
	className,
	optionId = '',
	handleOnBlur,
}: MultiSelectAutocompleteProps) => {
	const getDefaultValue = () => {
		return options?.filter((item) => data?.includes(item?.[optionId])) || [];
	};

	return (
		<div className={className}>
			{/* <span>{`${label}:`}</span> */}
			<div className="w-full ">
				<Autocomplete
					id={id}
					popupIcon={<KeyboardArrowDownIcon />}
					multiple={true}
					options={
						options.sort((a, b) =>
							alphabeticalSortComparator(
								getOptionLabel(a),
								getOptionLabel(b),
							),
						) ?? []
					}
					getOptionLabel={getOptionLabel}
					style={{width: '100%'}}
					size="small"
					onChange={onChange}
					defaultValue={getDefaultValue()}
					onBlur={handleOnBlur}
					renderInput={(params) => (
						<TextField
							{...params}
							onChange={onTextChange}
							margin="dense"
							placeholder={label}
							fullWidth
							value={data}
							sx={{
								borderColor: 'darkslategray',
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default FormMultiAutoComplete;
