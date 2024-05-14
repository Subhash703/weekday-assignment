import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import { alphabeticalSortComparator } from '../utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type SingleSelectAutocompleteProps = {
	id: string;
	label: string;
	options: any[];
	getOptionLabel: (item: any) => string;
	onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
	onTextChange: (e: React.ChangeEvent<any>) => void;
	data: any;
	className?: string;
};

const FormSingleAutoComplete = ({
	id,
	label,
	options,
	getOptionLabel,
	onChange,
	onTextChange,
	data,
	className,
}: SingleSelectAutocompleteProps) => {
	return (
		<div className={className}>
			<div className="w-full ">
				<Autocomplete
					className="w-full"
					id={id}
					popupIcon={<KeyboardArrowDownIcon />}
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
					renderInput={(params) => (
						<TextField
							{...params}
							onChange={onTextChange}
							margin="dense"
							placeholder={label}
							fullWidth
							value={data}
							style={{width: '100%'}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default FormSingleAutoComplete;
