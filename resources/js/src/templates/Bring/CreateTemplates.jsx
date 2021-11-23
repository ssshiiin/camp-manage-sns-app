import React, { useState } from 'react';

import { create } from '../../reducks/templates/operations';
import { useString } from '../../Function';
import { ModalMediaQuery } from '../../components/Modal';

import styles from '../../../../sass/templates/form.module.scss';
import { InputText, SubmitButton } from '../../components/Form';

const CreateTemplates = React.memo(
  React.forwardRef((props, ref) => {
    const [template, handleTemplate, setTemplate] = useString();
    const [open, setOpen] = useState(false);

    return (
      <ModalMediaQuery
        mb={300}
        pc={600}
        top={50}
        left={50}
        transX={50}
        transY={50}
        setOpen={setOpen}
        open={open}
        pull={true}
        nav={'テンプレートにする'}
        body={
          <form className={styles.postForm} noValidate autoComplete="off">
            <div className={styles.postForm__form}>
              <InputText value={template} onChange={handleTemplate} label={'テンプレート'} />
              <SubmitButton label={'保存する'} onClick={create(template, setOpen)} />
            </div>
          </form>
        }
      />
    );
  })
);

export default CreateTemplates;
