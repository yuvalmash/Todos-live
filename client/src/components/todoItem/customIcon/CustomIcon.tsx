import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { IconType } from '../../../types';

const iconMap: Record<IconType, React.ElementType> = {
  delete: DeleteIcon,
  edit: EditIcon,
  save: SaveIcon,
  cancel: HighlightOffIcon,
  check: CheckBoxIcon,
  uncheck: CheckBoxOutlineBlankIcon
};

type CustomIconProps = {
  iconType: IconType;
  onClick: () => void;
};

export default function CustomIcon({ iconType, onClick }: CustomIconProps) {
  const IconComponent = iconMap[iconType];

  return (
    <Tooltip title={iconType} placement='top'>
      <IconButton edge='start' size='large' color='primary' aria-label={iconType} onClick={onClick}>
        {IconComponent && <IconComponent sx={{ fontSize: '3vw' }} />}
      </IconButton>
    </Tooltip>
  );
}
